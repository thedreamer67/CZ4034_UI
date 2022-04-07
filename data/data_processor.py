"""
This code:
1) Makes the data's appearance in our search engine neater
2) Replaces null values in the fields 'accessibility' and 'whatsnearby' to be an empty string "" instead
3) Replaces all null values in the field 'couplerating' to be -1 instead
4) Adds a new field 'town' to each data entry (hotel), where 'In town' means that the hotel is located in town and 'Not in town' means that the hotel isn't located in town
"""

import json

with open("hotelinfo_wmrt_full.json") as f:
    hotel_data = json.load(f)
    f.close()

town = [
    "raffles",
    "tanjong pagar",
    "rochor",
    "orchard",
    "somerset",
    "newton",
    "thomson",
    "city hall",
    "shenton way",
    "bukit merah",
    "city hall",
    "downtown",
    "takashimaya",
    "ngee ann city",
    "centrepoint",
    "paragon",
]

for hotel in hotel_data:
    hotel["popularfacils"] = [" " + x for x in hotel["popularfacils"]]
    hotel["popularfacils"][0] = hotel["popularfacils"][0].strip()
    hotel["whatsnearby"] = [" " + x for x in hotel["whatsnearby"]]
    hotel["whatsnearby"][0] = hotel["whatsnearby"][0].strip()
    if not hotel["accessibility"]:
        hotel["accessibility"] = ""
    else:
        hotel["accessibility"] = [" " + x for x in hotel["accessibility"]]
        hotel["accessibility"][0] = hotel["accessibility"][0].strip()
    if not hotel["couplerating"]:
        hotel["couplerating"] = -1
    if any(area in hotel["location"].lower() for area in town) or any(
        area in " ".join(hotel["whatsnearby"]).lower() for area in town
    ):
        hotel["town"] = "In town"
    else:
        hotel["town"] = "Not in town"

json_obj = json.dumps(hotel_data, indent=1)
with open("hotelinfo_final.json", "w") as f:
    f.write(json_obj)
    f.close()
