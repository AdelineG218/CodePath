def is_balanced(code):
    d = dict()
    for c in code:
        if c in d.keys():
            d[c] += 1
        else:
            d[c] = 1
    avg = 0
    for item in d.values():
        avg += item
    avg = round(avg/len(d.values()))
    not_avg = 0
    for item in d.values():
        if item == avg + 1:
            not_avg += 1
        if not_avg > 1 or item > avg + 1 or item < avg:
            return False
    if not_avg == 1:
        return True
    return False
    

code1 = "arghh"
code2 = "haha"

print(is_balanced(code1)) 
print(is_balanced(code2)) 