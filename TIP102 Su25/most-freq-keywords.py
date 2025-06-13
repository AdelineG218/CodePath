from collections import Counter
def find_most_frequent_keywords(scenes):
    s = []
    for v in scenes.values():
        s.extend(v)
    c = Counter(s)
    m = max(c.values())
    l = []
    for i in c.keys():
        if c.get(i) == m:
            l.append(i)
    return l

scenes = {
    "Scene 1": ["action", "hero", "battle"],
    "Scene 2": ["hero", "action", "quest"],
    "Scene 3": ["battle", "strategy", "hero"],
    "Scene 4": ["action", "strategy"]
}
print(find_most_frequent_keywords(scenes))

scenes = {
    "Scene A": ["love", "drama"],
    "Scene B": ["drama", "love"],
    "Scene C": ["comedy", "love"],
    "Scene D": ["comedy", "drama"]
}
print(find_most_frequent_keywords(scenes)) 