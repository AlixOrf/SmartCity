import pandas as pd

df = pd.read_csv('Musee.csv', sep=';', encoding='utf-8')

df['Latitude'] = df['Latitude'].str.replace(',', '.').astype(float)
df['Longitude'] = df['Longitude'].str.replace(',', '.').astype(float)

data = df[['Latitude', 'Longitude', 'Nom officiel du musée']]

with open('markers.tsx', 'w', encoding='utf-8') as f:
    f.write("export const markers = [\n")
    for _, row in data.iterrows():
        nom_musee = row['Nom officiel du musée'].replace("'", "\\'")
        f.write(f"    {{ latitude: {row['Latitude']}, longitude: {row['Longitude']}, name: '{nom_musee}' }},\n")
    f.write("]\n")

print("Fichier markers.tsx généré.")
