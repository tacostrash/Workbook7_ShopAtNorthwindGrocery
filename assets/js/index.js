function searchOptionChange(){
  const searchOption = document.getElementById("searchOption").value;
  const categoryDropdown = document.getElementById("categoryDropdown");
  categoryDropdown.classList.toggle("hidden", searchOption !== "category");
  
}