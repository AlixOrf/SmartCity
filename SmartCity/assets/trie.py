import pandas as pd

# Chargement des données
df = pd.read_csv('Musee.csv', sep=';', encoding='utf-8')

# Remplacer les virgules par des points dans les colonnes Latitude et Longitude
df['Latitude'] = df['Latitude'].str.replace(',', '.').astype(float)
df['Longitude'] = df['Longitude'].str.replace(',', '.').astype(float)

# Sélectionner les colonnes Latitude, Longitude et Nom officiel du musée
data = df[['Latitude', 'Longitude', 'Nom officiel du musée']]

# Créer le fichier markers.tsx
with open('markers.tsx', 'w', encoding='utf-8') as f:
    f.write("export const markers = [\n")
    for _, row in data.iterrows():
        # Remplacer les apostrophes par des apostrophes échappées
        nom_musee = row['Nom officiel du musée'].replace("'", "\\'")
        f.write(f"    {{ latitude: {row['Latitude']}, longitude: {row['Longitude']}, name: '{nom_musee}' }},\n")
    f.write("]\n")

print("Fichier markers.tsx généré.")
