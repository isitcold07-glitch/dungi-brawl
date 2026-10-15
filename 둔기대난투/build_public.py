# brawl_dev.html → 공개용 파일 2개
#  1) brawl.html : Claude 아티팩트용. 아티팩트가 <!doctype>/<html>/<head>/<body> 뼈대를 자동으로 씌우므로 그 태그만 뺀다. (온라인 = Claude room)
#  2) ../docs/index.html : GitHub Pages 같은 일반 웹사이트용. 원본 그대로. (온라인 = PeerJS P2P 직접 연결)
import os, re
s = open('brawl_dev.html', encoding='utf-8').read()
head = re.search(r'<head>(.*?)</head>', s, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', s, re.S).group(1)
head = re.sub(r'<meta charset="utf-8">\s*', '', head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', '', head)
open('brawl.html', 'w', encoding='utf-8').write(head.strip() + '\n' + body.strip() + '\n')
os.makedirs('../docs', exist_ok=True)
open('../docs/index.html', 'w', encoding='utf-8').write(s)
print('brawl.html, ../docs/index.html 생성 완료')
