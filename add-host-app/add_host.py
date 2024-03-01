import paramiko
import os
from flask import Flask, request, render_template

app = Flask(__name__)

def update_files(host, address, port):
    with open('/novnc-gate/conf.d/novnc-f.conf', 'a') as file:
        file.write(f"[program: {host}-vnc]\n")
        file.write(f"command=/usr/share/novnc/utils/launch.sh --listen {port} --vnc {host}:5900\n")

    with open('/nginx-novnc/html/index.html', 'r') as file:
        content = file.readlines()

    with open('/nginx-novnc/html/index.html', 'w') as file:
        for line in content:
            if '<span style="display: none;"></span>' in line:
                file.write(f'    <a href="http://novnc.pivtochka.com/novnc/novnc-{port}/vnc.html?path=novnc/novnc-{port}/websockify&autoconnect=true&password=7953518&quality=2&compression=7&resize=scale" target="_blank"><button class="button">{address}</button></a>\n')
            file.write(line)

    with open(f'/nginx-tools/html/{host}.html', 'w') as file:
        file.write(f'<!DOCTYPE html>\n')
        file.write(f'<html>\n')
        file.write(f'  <head>\n')
        file.write(f'    <meta charset="utf-8">\n')
        file.write(f'    <title>{host}</title>\n')
        file.write(f'    <link rel="stylesheet" type="text/css" href="style.css">\n')
        file.write(f'  </head>\n')
        file.write(f'  <header>\n')
        file.write(f'   <h1>{address}</h1>\n')
        file.write(f'  </header>\n')
        file.write(f'  <body>\n')
        file.write(f'   <div class="button-column">\n')
        file.write(f'    <button class="button" onclick="openVNCLink()">NoVNC</button>\n')
        file.write(f'    <button class="button" id="btn1">Перезапуск 1С</button>\n')
        file.write(f'    <button class="button" id="btn2">Переподключение COM</button>\n')
        file.write(f'    <button class="button" id="btn3">Переподключение сканера</button>\n')
        file.write(f'    <button class="button" id="btn4">Удаление кеша 1С</button>\n')
        file.write(f'    <button class="button" id="btn6">Перезапуск InterCust</button>\n')
        file.write(f'    <button class="button" id="btn5">Отправить сообщение</button>\n')
        file.write(f'    <textarea id="message-input" rows="4" placeholder="Текст сообщения..."></textarea>\n')
        file.write(f'   </div>\n')
        file.write(f'   <iframe src="http://novnc.pivtochka.com/novnc/novnc-{port}/vnc.html?path=novnc/novnc-{port}/websockify&autoconnect=true&quality=2&compression=7&resize=scale&password=7953518" width="1024" height="576"></iframe>\n')
        file.write(f'   <h2>Отладка</h2>\n')
        file.write(f'   <div id="result"></div>\n')
        file.write(f'  </body>\n')
        file.write(f' <script src="script.js"></script>\n')
        file.write(f'</html>\n')

def update_mainpage(address, host):
    with open('/nginx-tools/html/index.html', 'r') as file:
        content = file.readlines()

    with open('/nginx-tools/html/index.html', 'w') as file:
        for line in content:
            if '<span style="display: none;"></span>' in line:
                file.write(f'         <a href="http://tools.pivtochka.com/{host}.html" target="_blank"><button class="button">{address}</button></a>\n')
            file.write(line)

def restart_container():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        client.connect('172.18.0.1', username='vncadmin', password='g5utubbW12!')

        stdin, stdout, stderr = client.exec_command('docker restart novnc-gate')
        exit_status = stdout.channel.recv_exit_status()

        if exit_status == 0:
            print('Контейнер novnc-gate успешно перезагружен на хосте')
        else:
            print('Ошибка при перезагрузке контейнера novnc-gate')

    finally:
        client.close()

@app.route('/', methods=['POST'])
def index():
    if request.method == 'POST':
        host = request.form.get('host')
        address = request.form.get('address')
        port = request.form.get('port')

        update_files(host, address, port)
        update_mainpage(address, host)
        restart_container()
        return 'Файлы успешно обновлены!'
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='172.18.0.6', port=6000)
