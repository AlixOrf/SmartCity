# **GwidMe**

GwidMe est une application mobile développée avec **React Native**, permettant aux utilisateurs de découvrir les musées de France grâce à une intégration avec **Supabase** pour la gestion des données, et à **react-native-maps** pour l'affichage des cartes. L'application permet également aux utilisateurs de mettre à jour la fréquentation des musées.

## **Table des Matières**

- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Installation des dépendances JavaScript (frontend)](#installation-des-dépendances-javascript-frontend)
  - [Installation des dépendances Python (backend)](#installation-des-dépendances-python-backend)
  - [Configuration de Supabase (backend)](#configuration-de-supabase-backend)
  - [Ajout de la barre de recherche](#ajout-de-la-barre-de-recherche)
- [Fonctionnalités](#fonctionnalités)
- [Lancement de l'application](#lancement-de-lapplication)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [License](#license)

## **Prérequis**

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js**
- **Python 3**
- Autres dépendances :
  - **pip**
  - **Expo**
  - **react-native-maps**

## **Installation**

### **Installation des dépendances JavaScript (frontend)**

Installez les bibliothèques nécessaires pour la gestion des cartes et la localisation :

```bash
npx expo install react-native-maps expo-location
```
### **Installation des dépendances Python (backend)**
Créez un environnement virtuel Python pour isoler vos dépendances :
```bash
python3 -m venv .venv
```

Activez l'environnement virtuel :

Pour Windows :

```bash
.venv\Scripts\activate
```

Pour macOS/Linux :

```bash
source .venv/bin/activate
```

Installez les dépendances Python à partir du fichier requirements.txt :

```bash
python3 -m pip install -r requirements.txt
```

### **Configuration de Supabase (backend)**
Installez le client Supabase pour interagir avec la base de données :

```bash
npm install @supabase/supabase-js
```

Ajout de la barre de recherche
```bash
npm install react-native-elements
```
## **Fonctionnalités**

**Recherche et affichage des musées :** Utilise react-native-maps pour afficher des musées sur une carte avec des coordonnées précises.

**Localisation en temps réel :** Grâce à expo-location, l'utilisateur peut visualiser sa position sur la carte.

**Intégration avec Supabase :** Utilisation de Supabase pour stocker et récupérer des informations sur les musées.

**Barre de recherche interactive :** Utilisation de react-native-elements pour une barre de recherche intuitive.

## **Lancement de l'application**
Démarrage du frontend avec Expo :

```bash
npx expo start
```
## **Lancement du backend Python (si nécessaire) :**

Activez l'environnement virtuel Python :

Windows :

```bash
.venv\Scripts\activate
```

macOS/Linux :

```bash
source .venv/bin/activate
```

## **Structure du projet**
```bash
SmartCity/
├── assets/              # Fichiers statiques comme des images et des polices
├── components/          # Composants réutilisables
├── navigation/          # Configuration de la navigation
├── screens/             # Différents écrans de l'application
├── App.tsx              # Point d'entrée de l'application
├── supabaseClient.js    # Configuration du client Supabase
└── README.md            # Documentation du projet
```
Contributeurs
Alix Orfeuvre
Kiara Wurtz
Esteban Videra Dumont
Awab Maaloum