import os
import re

# Define the directory containing your HTML files
directory = './'

# Regex pattern to match the src attribute of img tags
pattern = r'src="(.*?)"'

# Iterate over all HTML files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        
        with open(filepath, 'r') as file:
            content = file.read()

        # Replace the src attributes with {% static %} wrapped paths
        updated_content = re.sub(pattern, r'src="{% static \'\1\' %}"', content)                                                               
       # updated_content = re.sub(pattern, r'src="static/\1"', content)

        updated_content = updated_content.replace("\\'", "'")

        with open(filepath, 'w') as file:
            file.write(updated_content)

        print(f'Updated file: {filename}')
