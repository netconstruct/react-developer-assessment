import dayjs from 'dayjs';
import localisedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localisedFormat);

export function formatDateString(dateString) {
    return dayjs(dateString).format('DD/MM/YYYY LT');
}
export function getCategoriesFromData(data){
    const categories = []
    data.forEach(entry=>{
        categories.push(entry.categories.map(category=>category.name))
    })
    const flattenedCategories = categories.flat();
    const result = [...new Set(flattenedCategories)]
    return result
}