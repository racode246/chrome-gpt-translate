# Chrome GPT Translate

This extension is a Chrome extension for translating selected text using GPT.

**Note: Currently, this extension only supports translation from English to Japanese.**

## Installation

1. Clone this repository.

   ```sh
   git clone https://github.com/racode246/chrome-gpt-translate.git
   ```

2. Open Chrome and go to the Extensions management page. Access `chrome://extensions/` or select "Extensions" from the menu.

3. Turn on "Developer mode" in the top right corner.

4. Click "Load unpacked" and select the folder of the cloned repository.

## Usage

1. Select the text you want to translate.

2. A "Translate" button will appear near the selected text.

3. Click the "Translate" button to display the translation result in a popup.

## Development

### Required Tools

- Node.js
- npm

### Setup

1. Install the necessary packages.

   ```sh
   npm install
   ```

2. Run the development build.

   ```sh
   npm run build
   ```

3. Create a `.env` file in the root directory and add the following configuration:

   ```env
   GPT_API_KEY=your_gpt_api_key_here
   ```

### Folder Structure

- `scripts/content/index.ts`: Main script file.
- `scripts/content/fetchGpt.ts`: Contains functions for GPT translation.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
