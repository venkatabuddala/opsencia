import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    const baseTitle = 'Opsencia';
    const fullTitle = title ? `${baseTitle} - ${title}` : baseTitle;
    
    // Update the document title
    document.title = fullTitle;
    
    // Update meta title if it exists
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', fullTitle);
    }
    
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = baseTitle;
      if (metaTitle) {
        metaTitle.setAttribute('content', baseTitle);
      }
    };
  }, [title]);
};

export default usePageTitle;
