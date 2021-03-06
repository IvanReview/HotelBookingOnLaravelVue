export  function makePagination(data) {
    //засовываем параметры пагинации в объект, который будет перезаписан, каждый раз при вызов метода

    const pagination = {
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        pages: data.links.filter(item => (typeof(item.label) === 'number'))
    };

    return pagination
}








