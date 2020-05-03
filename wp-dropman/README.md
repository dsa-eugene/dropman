# wp-dropman
### Getting it embedded on wordpress plugin page
- Copy wp-dropman folder to /wp-content/plugins/
- Set location of api.php in angular dropman config
- Build angular app `ng build`
- Copy dist/dropman to wp-content/plugins/dropman
- Change `<base href="/">` to `<base href="/wp-content/plugins/dropman/dropman/">` in dropman/index.html
