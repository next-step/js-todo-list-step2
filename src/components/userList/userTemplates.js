export const userButtonTemplate = ({name, _id}) => {
    return `<button class="ripple" id=${_id}>${name}</button>`;
  }
  
export const userControlTemplate = () => {
    return `<button class="ripple user-create-button">+ 유저 생성</button>
            <button class="ripple user-delete-button">- 유저 삭제</button>`;
}