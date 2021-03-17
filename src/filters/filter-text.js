export default function filterText(value) {
    if(value === 1 || value === 21 || value === 31) {
        return `${value} отзыв`
    }else if(value > 1) {
        return `${value} отзыва` 
    }else if(value >= 5) {
        return `${value} отзывов` 
    }
}