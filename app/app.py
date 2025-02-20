import winrm
from winrm.protocol import Protocol
import hashlib
from flask import Flask, request
from flask_cors import cross_origin

hashlib.algorithms_available
{'md5-sha1', 'md4', 'shake_128', 'md5', 'blake2s', 'sha3_512', 'ripemd160', 'sha512', 'mdc2', 'blake2b', 'sha3_256', 'sha3_224', 'sha512_224', 'sha1', 'sha384', 'sha256', 'sha224', 'whirlpool', 'sha512_256', 'sm3'}

app = Flask(__name__)

@app.route('/execute', methods=['POST'])
@cross_origin()
def execute_command():
    data = request.get_json()
    host = data.get('host')
    command = data.get('command')

    if command is None or host is None:
        return "Error: Invalid request data.", 400

    p = Protocol(
        endpoint=f'https://{host}:5986/wsman',
        transport='ntlm',
        username='domain\admin',
        password='password',
        server_cert_validation='ignore'
    )
    shell_id = p.open_shell()
    command_id = p.run_command(shell_id, command)
    std_out, std_err, status_code = p.get_command_output(shell_id, command_id)
    p.cleanup_command(shell_id, command_id)
    p.close_shell(shell_id)
    return f"stdout: {std_out} stderr: {std_err} status_code: {status_code} on {host}"
    print(data)

if __name__ == '__main__':
    app.run(debug=True, host='172.18.0.4', port=5000)
