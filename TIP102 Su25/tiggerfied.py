def tiggerfy(word):
    tiggerfied = ""
    remove = [0 for _ in range(len(word))]
    for i in range(len(word)-1):
        if word[i].lower() == "t" or word[i].lower() == "i":
            remove[i] = 1
        if word[i:i+2].lower() == "gg" or word[i:i+2].lower() == "er":
            remove[i] = 1
            remove[i+1] = 1
            i += 1
    if word[-1].lower() == "t" or word[-1].lower() == "i":
            remove[-1] = 1
    for i in range(len(word)):
        if remove[i] == 0:
            tiggerfied += word[i]
    return tiggerfied

word = "Trigger"
print(tiggerfy(word))

word = "eggplant"
print(tiggerfy(word))

word = "Choir"
print(tiggerfy(word))
