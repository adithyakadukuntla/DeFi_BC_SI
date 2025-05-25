import os
import json
import re

def clean_line(line):
    # Remove ANSI escape sequences and null/wide characters
    line = re.sub(r'\x1b\[[0-9;]*m', '', line)  # Remove ANSI color codes
    line = line.replace('\x00', '')             # Remove nulls
    line = line.encode('ascii', 'ignore').decode()  # Remove non-ascii
    return line.strip()

def extract_all_logs():
    log_path = r'D:\DeFi_BC_SI\smart-contracts\output.txt'
    output_path = os.path.join(os.path.dirname(__file__), 'tx_data.json')
    
    if not os.path.exists(log_path):
        print(f"Log file not found: {log_path}")
        return []

    # Read and clean lines
    try:
        with open(log_path, 'r', encoding='utf-8') as f:
            raw_lines = f.readlines()
    except UnicodeDecodeError:
        with open(log_path, 'r', encoding='latin-1') as f:
            raw_lines = f.readlines()

    # Clean up the lines
    lines = [clean_line(line) for line in raw_lines if clean_line(line)]
    text = '\n'.join(lines)
    print(text)

    # Regular expression to match all transaction blocks
    tx_block_re = re.compile(
        r'eth_sendTransaction.*?Transaction:\s*(?P<tx_hash>0x[a-fA-F0-9]+).*?'
        r'From:\s*(?P<from>0x[a-fA-F0-9]+).*?'
        r'To:\s*(?P<to>0x[a-fA-F0-9]+).*?'
        r'Value:\s*(?P<value>[\d\.]+)\s*ETH.*?'
        r'Gas used:\s*(?P<gas_used>\d+)\s*of.*?'
        r'Block #\d+:\s*(?P<block_hash>0x[a-fA-F0-9]+)',
        re.DOTALL | re.IGNORECASE
    )

    transactions = []
    for match in tx_block_re.finditer(text):
        try:
            value_str = match.group('value').replace('.', '') if match.group('value').endswith('.') else match.group('value')
            value = float(value_str) if '.' in value_str else int(value_str)
            transactions.append({
                "transactionHash": match.group('tx_hash'),
                "from": match.group('from'),
                "to": match.group('to'),
                "value": value,
                "gasUsed": int(match.group('gas_used')),
                "blockHash": match.group('block_hash')
            })
        except Exception as e:
            print(f"Error parsing transaction: {e}")

    # Deduplicate transactions
    existing_data = []
    if os.path.exists(output_path):
        try:
            with open(output_path, 'r') as f:
                existing_data = json.load(f)
        except json.JSONDecodeError:
            pass

    existing_hashes = {tx['transactionHash'] for tx in existing_data}
    new_transactions = [tx for tx in transactions if tx['transactionHash'] not in existing_hashes]

    # Save all transactions (existing + new)
    all_transactions = existing_data + new_transactions
    with open(output_path, 'w') as f:
        json.dump(transactions, f, indent=2)

    print(f"Found {len(new_transactions)} new transactions")
    # print(transactions)
    # print(all_transactions)
    return transactions
