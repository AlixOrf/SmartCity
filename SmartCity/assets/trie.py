import pandas as pd

df = pd.read_csv('Musee.csv', sep=';', encoding='utf-8')

df['Latitude'] = df['Latitude'].str.replace(',', '.').astype(float)
df['Longitude'] = df['Longitude'].str.replace(',', '.').astype(float)


with open('infoData.tsx', 'w', encoding='utf-8') as f:
    f.write("export const info = [\n")
    for _, row in df.iterrows():
        # Handle NaN values and escape characters properly
        nom_musee = str(row['Nom officiel du musée']) if not pd.isna(row['Nom officiel du musée']) else ''
        adresse = str(row['Adresse']) if not pd.isna(row['Adresse']) else ''
        site = str(row['URL']) if not pd.isna(row['URL']) else ''
        téléphone = str(row['Téléphone']) if not pd.isna(row['Téléphone']) else ''
        
        # Escape single quotes and backslashes
        nom_musee = nom_musee.replace("\\", "\\\\").replace("'", "\\'")
        adresse = adresse.replace("\\", "\\\\").replace("'", "\\'")
        site = site.replace("\\", "\\\\").replace("'", "\\'")
        téléphone = téléphone.replace("\\", "\\\\").replace("'", "\\'")
        
        # Wrap string values in quotes
        f.write(f"    {{ latitude: {row['Latitude']}, longitude: {row['Longitude']}, adresse: '{adresse}', site: '{site}', téléphone: '{téléphone}', name: '{nom_musee}' }},\n")
    f.write("]\n")

print("Fichier info.tsx généré.")


