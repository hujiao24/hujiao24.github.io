import re
import sys

DOMAIN = "https://blog.qc7.org"

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(
        r'(!\[.*?\])\(\s*(/.*?)\)',
        rf'\1({DOMAIN}\2)',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"update domain succ: {file_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: python update_domain.py markdown_file.md")
    else:
        process_file(sys.argv[1])