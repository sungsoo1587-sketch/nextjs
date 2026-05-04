const TodoSelct = ({
  categories,

  addCategory,
  setAddCategory,
  addTitle,
  setAddTitle,
  addDesc,
  setAddDesc,

  handleAdd,

  editCategory,
  setEditCategory,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,

  handleEdit,

  buttonText
}) => {
  const isEdit = !!editTitle;
  const categoryValue = isEdit ? editCategory : addCategory;
  const setCategory = isEdit ? setEditCategory : setAddCategory;

  const titleValue = isEdit ? editTitle : addTitle;
  const setTitleValue = isEdit ? setEditTitle : setAddTitle;

  const descValue = isEdit ? editDesc : addDesc;
  const setDestValue = isEdit ? setEditDesc : setAddDesc;

  const handle  = isEdit ? handleEdit : handleAdd;

  return (
    <>  
    <select value={categoryValue} onChange={(e) => setCategory(e.target.value)}>
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>

    <input
      type="text"
      placeholder="타이틀을 입력해주세요"
      value={titleValue}
      onChange={(e) => setTitleValue(e.target.value)}
    />

    <input
      type="text"
      placeholder="설명을 입력해주세요"
      value={descValue}
      onChange={(e) => setDestValue(e.target.value)}
    />

    <button type="button" onClick={handle}>{buttonText}</button>
    </>
  )
};

export default TodoSelct;