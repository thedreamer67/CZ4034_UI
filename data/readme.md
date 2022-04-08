## Datasets we have
1. hotelinfo_processed.json
    - Contains hotel information such as the hotel name, location, amenities, etc.
    - From the original data, nested lists were split into columns since elasticsearch doesn't allow for such formats.

2. hotelinfo_wmrt_full.json
    - Built on from hotelinfo_processed.json.
    - Processed the data to add the distances from each hotel to Orchard MRT Station, City Hall MRT Station, Raffles Place MRT Station and Esplanade MRT Station. Field is null if the distance is too far.
    
4. hotelinfo_final.json
    - Built on from hotelinfo_wmrt_full.json.
    - Processed the data to add information on whether or not each hotel is in town
    - A hotel is considered to be in town if any of these words appear in the 'location' or 'whatsnearby' field:
        - raffles
        - tanjong pagar
        - rochor
        - orchard
        - somerset
        - newton
        - thomson
        - city hall
        - shenton way
        - bukit merah
        - downtown
        - takashimaya
        - ngee ann city
        - centrepoint
        - paragon
