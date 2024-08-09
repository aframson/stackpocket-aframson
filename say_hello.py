# say_hello.py
def sayHello():
    return {
        "message": "I am saying hello"
    }

result = sayHello()

with open('result.txt', 'a') as f:
    f.write(str(result) + '\n')
