from collections import Counter
def identify_repeated_themes(scenes):
    out = set()
    st = set()
    for s in scenes:
        if s["theme"] in st:
            out.add(s["theme"])
        else:
            st.add(s["theme"])
    return list(out)

scenes = [
    {"scene": "The hero enters the dark forest.", "theme": "courage"},
    {"scene": "A mysterious figure appears.", "theme": "mystery"},
    {"scene": "The hero faces his fears.", "theme": "courage"},
    {"scene": "An eerie silence fills the air.", "theme": "mystery"},
    {"scene": "The hero finds a hidden treasure.", "theme": "discovery"}
]

repeated_themes = identify_repeated_themes(scenes)
print(repeated_themes)

scenes = [
    {"scene": "The spaceship lands on an alien planet.", "theme": "exploration"},
    {"scene": "A strange creature approaches.", "theme": "danger"},
    {"scene": "The crew explores the new world.", "theme": "exploration"},
    {"scene": "The crew encounters hostile forces.", "theme": "conflict"},
    {"scene": "The crew makes a narrow escape.", "theme": "danger"}
]

repeated_themes = identify_repeated_themes(scenes)
print(repeated_themes)