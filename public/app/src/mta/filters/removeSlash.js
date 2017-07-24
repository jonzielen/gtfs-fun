function removeSlash() {
     return (item) => {
        if (!!item) {
            return item.replace(/\//g, '');
        } else {
            return null;
        }
    }
}

export default removeSlash;
