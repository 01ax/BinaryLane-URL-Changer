document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('changeUrlButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      let newUrl = tab.url;

      if (tab.url.includes('https://www.binarylane.com.au/')) {
        if (tab.url.includes('/manage/')) {
          newUrl = newUrl.replace('https://www.binarylane.com.au/mpanel/manage/', 'https://home.binarylane.com.au/server/');
          newUrl = newUrl.replace('/overview', '');
        } else if (tab.url.includes('/ssh-keys')) {
          newUrl = 'https://home.binarylane.com.au/ssh-keys';
        } else if (tab.url.includes('/domains')) {
          newUrl = 'https://home.binarylane.com.au/domains';
        } else if (tab.url.includes('/profile/balance')) {
          newUrl = 'https://home.binarylane.com.au/billing/pending';
        } else {
          newUrl = 'https://home.binarylane.com.au/services/servers';
        }

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: changeUrlFunction,
          args: [newUrl]
        });
      }
    });
  });
});

function changeUrlFunction(newUrl) {
  window.location.href = newUrl;
}
