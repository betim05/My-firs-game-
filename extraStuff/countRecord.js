export const countHtml = document.querySelector('#count');
const recordHtml = document.querySelector('#record');
export let countRecord = {
    count: 0,
    record: 0
}

export function addCount() {
    const countHtml = document.querySelector('#count');
    countRecord.count++;
    countHtml.textContent = countRecord.count;


}
export function changeRecord() {
    if (countRecord.count > countRecord.record) {
        const recordHtml = document.querySelector('#record');
        countRecord.record = countRecord.count;
        recordHtml.textContent = countRecord.record;
    }
}