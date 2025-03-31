import { HeaderCategoriesContainer, StyledCategory } from "./styles";

const HeaderCategories = () => {
   return (
      <HeaderCategoriesContainer>
         <StyledCategory>All</StyledCategory>
         <StyledCategory>Technology</StyledCategory>
         <StyledCategory>Design</StyledCategory>
         <StyledCategory>Business</StyledCategory>
         <StyledCategory>Politics</StyledCategory>
         <StyledCategory>Science</StyledCategory>
         <StyledCategory>Health</StyledCategory>
      </HeaderCategoriesContainer>
   );
};

export default HeaderCategories;
