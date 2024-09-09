import csv
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from tqdm import tqdm

# Set Chrome options to run in headless mode
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
chrome_options.add_argument("--no-sandbox")  # Bypass OS security model
chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems

# Initialize the WebDriver with options
driver = webdriver.Chrome(options=chrome_options)

total_pages = 13420
csv_file = 'property_data.csv'

# Create the CSV file and write the header once
with open(csv_file, 'w', newline='') as file:
    writer = csv.writer(file)
    header = ['Rent Space Name', 'Price', 'Beds', 'Showers', 'Garages', 'Area']
    writer.writerow(header)

# Loop through each page with a progress bar
for page in tqdm(range(1, total_pages + 1), desc="Scraping pages"):
    url = f'https://meqasa.com/properties-for-rent-in-ghana?w={page}'
    driver.get(url)

    # Give the page some time to load
    driver.implicitly_wait(10)

    # Get the page source after JavaScript has executed
    page_source = driver.page_source

    # Parse with BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')
    list_view = soup.find('div', id='listview')

    containers = list_view.find_all('div', class_="col-xs-12")

    # Prepare a list to store the data for this page
    property_data = []

    # Loop through each container and extract the relevant information
    for container in containers:
        # Extract the rent space name (usually in the <h2> or <a> tag)
        name_tag = container.find('h2')
        rent_space_name = name_tag.get_text(strip=True) if name_tag else "N/A"

        # Extract the price
        price_tag = container.find('p', class_='h3')
        price = price_tag.get_text(strip=True) if price_tag else "N/A"

        # Extract number of beds, showers, garages, and area
        prop_features = container.find('ul', class_='prop-features')
        if prop_features:
            beds = prop_features.find('li', class_='bed').span.get_text() if prop_features.find('li', class_='bed') else "N/A"
            showers = prop_features.find('li', class_='shower').span.get_text() if prop_features.find('li', class_='shower') else "N/A"
            garages = prop_features.find('li', class_='garage').span.get_text() if prop_features.find('li', class_='garage') else "N/A"
            area = prop_features.find('li', class_='area').span.get_text() if prop_features.find('li', class_='area') else "N/A"
        else:
            beds, showers, garages, area = "N/A", "N/A", "N/A", "N/A"

        # Filter out blocks with any "N/A" in key fields
        if "N/A" not in [rent_space_name, price, beds, showers, garages, area]:
            # Add the data to the list for this page
            property_data.append([rent_space_name, price, beds, showers, garages, area])

    # Append the data to the CSV file
    with open(csv_file, 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(property_data)

    # Add a small delay to prevent overwhelming the server
    time.sleep(1)

# Close the WebDriver
driver.quit()

print(f"Data scraping completed and saved to {csv_file}")
