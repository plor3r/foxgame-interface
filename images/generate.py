import json

base = {
    "name": "",
    "description": "Thousands of Sheep and Wolves compete on a farm in the metaverse. A tempting prize of $WOOL awaits, with deadly high stakes.",
    "image": "",
    "attributes": []
}

for i in range(1, 13809):
    base["name"] = f"Sheep #{i}"
    base["image"] = f"https://wolfgame.s3.amazonaws.com/sheep/{i}.svg"
    with open(f"sheepdata/{i}.json", "w") as f:
        f.write(json.dumps(base))

for i in range(1, 13809):
    base["name"] = f"Wolf #{i}"
    base["image"] = f"https://wolfgame.s3.amazonaws.com/wolf/{i}.svg"
    with open(f"wolfdata/{i}.json", "w") as f:
        f.write(json.dumps(base))
