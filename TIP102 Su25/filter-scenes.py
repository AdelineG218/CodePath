def filter_scenes_by_keyword(scenes, keyword):
    filtered = []
    for s in scenes:
        if s.find(keyword) == -1:
            filtered.append(s)
    return filtered

scenes = [
    "The hero enters the dark forest.",
    "A mysterious figure appears.",
    "The hero finds a hidden treasure.",
    "An eerie silence fills the air."
]
keyword = "hero"

filtered_scenes = filter_scenes_by_keyword(scenes, keyword)
print(filtered_scenes)

scenes = [
    "The spaceship lands on an alien planet.",
    "A strange creature approaches the crew.",
    "The crew prepares to explore the new world."
]
keyword = "crew"

filtered_scenes = filter_scenes_by_keyword(scenes, keyword)
print(filtered_scenes)