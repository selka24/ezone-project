const scrollNo = ref(0)
export const useUtils = () => {
    const useDateFormat = (date: string) => {
        return useState('dateFormat', () => date.split('T')[0]);
    }

    const useScrollTo = (parentId?: string, id: string = 'null') => {
        const offsetTop = document.getElementById(`${id}`)?.offsetTop;
        if(offsetTop){
            if(parentId){
                const parent = document.getElementById(`${parentId}`);
                if(parent) {
                    if(offsetTop < scrollNo.value) {
                        let interval = setInterval(() => {
                            parent.scrollTop = scrollNo.value-=5;
                            if(scrollNo.value <= offsetTop){
                                parent.scrollTop =offsetTop
                                clearInterval(interval);
                            }
                        },5);
                    } else {
                        let interval = setInterval(() => {
                            parent.scrollTop = scrollNo.value+=5;
                            if(scrollNo.value >= offsetTop){
                                parent.scrollTop = offsetTop
                                clearInterval(interval);
                            }
                        },5);
                    }
                }
            } else {
                scroll({
                    top: offsetTop,
                    behavior: "smooth"
                } );
            }
        }
    }
    return {
        useDateFormat,
        useScrollTo
    }
}

