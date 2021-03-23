const PRIORITY_FILTER = {
  "NONE": `<select class="chip select">
                <option value="0" selected="">순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`,
  "FIRST": `<span class="chip primary">1순위</span>`,
  "SECOND": `<span class="chip secondary">2순위</span>`
}

export function priorityFiltering(key) {
  return PRIORITY_FILTER[key]
}