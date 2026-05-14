export async function renderAboutHotel(info) {
  const features= info.features;
  const container = document.querySelector('[data-info="hotel"]');

  const infoTitle = container.querySelector('[data-info="title"]');
  const infoDesc = container.querySelector('[data-info="text"]');
  if (infoTitle) infoTitle.textContent = info.mainDescription;
  if (infoDesc) infoDesc.textContent = info.description;

  const wrapper = container.querySelector('[data-info="lists-container"]');
  const template = container.querySelector('[data-info-template]');
  const block = template.content.querySelector('[data-info="list-block"]');
  const listItem = template.content.querySelector('li');

  const blockFragment = document.createDocumentFragment();
  features.forEach(item => {
    const cloneBlock = block.cloneNode(true);
    const list = cloneBlock.querySelector('[data-info="list"]')
    const title = cloneBlock.querySelector('[data-info="list-title"]');

    if (title) title.textContent = item.title?.trim();

    const entry = item.entries;
    entry.forEach(el => {
      const cloneItem = listItem.cloneNode(true);
      cloneItem.textContent = el.trim();
      list.append(cloneItem);
    })

    blockFragment.append(cloneBlock);
  })

  wrapper.append(blockFragment);
}