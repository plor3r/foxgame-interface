import json

base = {
    "name": "",
    "description": "Thousands of Sheep and Wolves compete on a farm in the metaverse. A tempting prize of $WOOL awaits, with deadly high stakes.",
    "image": "",
    "attributes": []
}

base["image"] = "https://wolfgame.s3.amazonaws.com/sheep.svg"
for i in range(1, 13809):
    base["name"] = f"Sheep #{i}"
    with open(f"sheep/{i}.json", "w") as f:
        f.write(json.dumps(base))

base["image"] = "https://wolfgame.s3.amazonaws.com/wolf.svg"
for i in range(1, 13809):
    base["name"] = f"Wolf #{i}"
    with open(f"wolf/{i}.json", "w") as f:
        f.write(json.dumps(base))
