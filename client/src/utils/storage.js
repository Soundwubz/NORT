export function getFromStorage(key) {
    if (!key) {
      return null;
    }  try {
      const valueStr = localStorage.getItem(key);
      if (valueStr) {
        return JSON.parse(valueStr);
      }
      return null;
    } catch (err) {
      return null;
    }
  }
export function setInStorage(key, obj) {
    if (!key) {
      console.error('Error: Key is missing');
    }  try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
      console.error(err);
    }
  }
export function verifyToken(url, obj) {
  if (obj && obj.token) {
        const {token} = obj;
        const verified = fetch(url + token).then(res => res.json()).then(json => {
            if(json.success) {
                return {
                  success: true,
                  userId: json.userId
                };
            } else {
              return {
                success: false
              };
            }
        }).catch((err) => {
          console.error('verifyToken:',err);
        });
        return verified;
  } else {
    return {
      success: false
    };
  }
}