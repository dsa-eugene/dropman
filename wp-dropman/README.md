# wp-dropman
### Usage
- Copy config.sample.php to config.php and set location in angular dropman config
### Getting it embedded on wordpress plugin page
- Copy wp-dropman folder to /wp-content/plugins/
- Build angular app
- Copy dist/dropman to wp-content/plugins/dropman
- Change `<base href="/">` to `<base href="/wp-content/plugins/dropman/dropman/">` in dropman/index.html
- Uncomment line in inc/panel.php requiring it
