'use client';

import { getCategories } from '@/src/services/Categories.service';
import { useEffect, useState } from 'react';
import ICategory from '@/src/interfaces/ICategory';
import useCategoryFilter from '@/src/hooks/useCategoryFilter';
import { getBooks } from '@/src/services/Book.service';
import useBookFilter from '@/src/hooks/useBookFilter';
import { HeaderCategoriesContainer, StyledCategory } from './styles';

const HeaderCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { title } = useBookFilter();
  const { slug, setSlug } = useCategoryFilter();
  const { refetch } = getBooks(slug, title);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();

        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  });

  return (
    <HeaderCategoriesContainer>
      <StyledCategory
        onClick={() => {
          setSlug('');
          refetch();
        }}
        $active={slug === ''}
      >
        Todos
      </StyledCategory>
      {categories.map(category => (
        <StyledCategory
          onClick={() => {
            setSlug(category.slug);
            refetch();
          }}
          key={category.id}
          $active={slug === category.slug}
        >
          {category.name}
        </StyledCategory>
      ))}
    </HeaderCategoriesContainer>
  );
};

export default HeaderCategories;
