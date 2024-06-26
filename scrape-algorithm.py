import os
import json
import requests
from bs4 import BeautifulSoup

# List of URLs to scrape
urls = [
    'https://www.houseplans.com/plan/2047-square-feet-4-bedroom-3-bathroom-2-garage-country-craftsman-farmhouse-ranch-sp346871',
    'https://www.houseplans.com/plan/1642-square-feet-3-bedroom-2-5-bathroom-2-garage-farmhouse-modern-sp289231',
    'https://www.houseplans.com/plan/3804-square-feet-4-bedroom-3-5-bathroom-3-garage-modern-european-sp295955'
]

# Directory to save images
image_dir_base = 'houseplan_images'
if not os.path.exists(image_dir_base):
    os.makedirs(image_dir_base)

# List to hold all scraped data
all_scraped_data = []

# Function to scrape data from a single URL
def scrape_data(url, index):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    divelemet = soup.find_all('img', class_="w-full", height=533)
    labels = soup.find_all('div', class_='lg:max-w-601px mb-5 pt-2 px-3 lg:px-0 order-2 sm:order-1')

    image_link_data = []
    category_dict = {}

    for elem in divelemet:
        image_link = elem.get('data-lazy', '')
        if image_link:
            image_link_data.append(image_link)

    for texts in labels:
        x = texts.find_all('div', class_="block")
        for it in x:
            d = it.find_all('h3')
            for every_title in d:
                category_title = every_title.get_text().strip()
                if category_title not in category_dict:
                    category_dict[category_title] = []
            sub = it.find_all('div', class_="flex")
            for text_data in sub:
                category_text = text_data.find_all('div', class_="w-1/2 text-xs md:text-sm font-normal leading-normal")
                for each_item in category_text:
                    category_value = each_item.get_text().strip()
                    if category_title:
                        category_dict[category_title].append(category_value)

    image_path_data = []
    # Create a directory for the URL
    url_dir = os.path.join(image_dir_base, f'url_{index + 1}')
    if not os.path.exists(url_dir):
        os.makedirs(url_dir)

    for img_index, image_url in enumerate(image_link_data):
        if image_url:
            image_response = requests.get(image_url)
            img_path = os.path.join(url_dir, f'image_{img_index + 1}.jpg')
            with open(img_path, 'wb') as file:
                file.write(image_response.content)
            image_path_data.append(img_path)

    return {
        "url": url,
        "images": image_path_data,
        "categories": category_dict
    }

# Scrape data from each URL and append to the list
for index, url in enumerate(urls):
    scraped_data = scrape_data(url, index)
    all_scraped_data.append(scraped_data)

# Save all scraped data to a JSON file
with open('all_scraped_data.json', 'w') as json_file:
    json.dump(all_scraped_data, json_file, indent=4)

# Print all scraped data
print(json.dumps(all_scraped_data, indent=4))
