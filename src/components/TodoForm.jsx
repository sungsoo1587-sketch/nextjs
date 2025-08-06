
function TodoForm({ formData, types, handleInputChange, onSubmit, isModify, buttonTxt }) {
  return (
    <div className="wrap_add">
      <select title="타입 선택" name="type" value={formData.type} onChange={handleInputChange}>
        <option value="">타입을 선택하세요</option>
        {types.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <input type="text" name="title" placeholder="타이틀 입력" value={formData.title} onChange={handleInputChange} />
      <input type="text" name="text" placeholder="설명 입력" value={formData.text} onChange={handleInputChange} />
      <button type="button" onClick={onSubmit}>
        {buttonTxt}
      </button>
    </div>
  );
}

export default TodoForm;
