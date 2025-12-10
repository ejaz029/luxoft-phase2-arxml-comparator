// src/components/ResultsDashboard.jsx

import React, { useState } from 'react';

import styled from 'styled-components';

import { FilePlus, FileMinus, FileDiff, Download, CheckCircle } from 'lucide-react';



// --- Styled Components ---

const DashboardContainer = styled.div`

  width: 100%;

  max-width: 900px;

  margin: 0 auto;

  animation: fadeIn 0.5s ease-in;

`;



const StatsGrid = styled.div`

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.lg};



  @media (max-width: 600px) {

    grid-template-columns: 1fr;

  }

`;



const StatCard = styled.button`

  background: ${({ theme }) => theme.colors.surface};

  border: 2px solid ${({ $active, $color, theme }) => 

    $active ? $color : theme.colors.border};

  border-radius: ${({ theme }) => theme.borderRadius.md};

  padding: ${({ theme }) => theme.spacing.lg};

  text-align: left;

  cursor: pointer;

  transition: all 0.2s ease;

  position: relative;

  overflow: hidden;



  &:hover {

    transform: translateY(-2px);

    box-shadow: ${({ theme }) => theme.shadows.md};

    border-color: ${({ $color }) => $color};

  }



  h3 {

    font-size: 2rem;

    margin: 0;

    color: ${({ $color }) => $color};

    font-weight: bold;

  }

  

  p {

    margin: 5px 0 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: 0.9rem;

    text-transform: uppercase;

    letter-spacing: 1px;

  }

`;



const ActionRow = styled.div`

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: ${({ theme }) => theme.spacing.md};

  padding-bottom: ${({ theme }) => theme.spacing.md};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

`;



const FilterTitle = styled.h4`

  margin: 0;

  color: ${({ theme }) => theme.colors.textPrimary};

  display: flex;

  align-items: center;

  gap: 8px;

`;



const DownloadLink = styled.a`

  display: flex;

  align-items: center;

  gap: 8px;

  background-color: ${({ theme }) => theme.colors.primary};

  color: white;

  padding: 8px 16px;

  border-radius: ${({ theme }) => theme.borderRadius.md};

  text-decoration: none;

  font-weight: 500;

  transition: background 0.2s;



  &:hover {

    background-color: ${({ theme }) => theme.colors.primaryDark || '#1d4ed8'};

  }

`;



const ListContainer = styled.div`

  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.borderRadius.md};

  max-height: 400px;

  overflow-y: auto;

`;



const ListItem = styled.div`

  padding: 12px 16px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  display: flex;

  align-items: center;

  gap: 12px;

  font-family: ${({ theme }) => theme.typography.family.secondary};

  font-size: 0.9rem;

  

  &:last-child {

    border-bottom: none;

  }



  &:hover {

    background-color: ${({ theme }) => theme.colors.background};

  }

`;



const Badge = styled.span`

  font-size: 0.75rem;

  padding: 2px 8px;

  border-radius: 12px;

  font-weight: bold;

  background-color: ${({ $bg }) => $bg};

  color: ${({ $text }) => $text};

  min-width: 70px;

  text-align: center;

`;



// --- The Component ---

function ResultsDashboard({ data, theme }) {

  const [filter, setFilter] = useState('ALL'); // 'ALL', 'ADDED', 'REMOVED', 'MODIFIED'



  const { summary, details, excel_url } = data;



  // Flatten the details into a single list for display

  const allChanges = [

    ...(details.added || []).map(item => ({ ...item, type: 'ADDED' })),

    ...(details.removed || []).map(item => ({ ...item, type: 'REMOVED' })),

    ...(details.modified || []).map(item => ({ ...item, type: 'MODIFIED' }))

  ];



  const filteredList = filter === 'ALL' 

    ? allChanges 

    : allChanges.filter(item => item.type === filter);



  const getIcon = (type) => {

    if (type === 'ADDED') return <FilePlus size={16} color={theme.colors.success || '#10b981'} />;

    if (type === 'REMOVED') return <FileMinus size={16} color={theme.colors.danger || '#ef4444'} />;

    return <FileDiff size={16} color="#f59e0b" />;

  };



  const getBadgeColor = (type) => {

    if (type === 'ADDED') return { bg: '#d1fae5', text: '#065f46' }; // Light Green

    if (type === 'REMOVED') return { bg: '#fee2e2', text: '#991b1b' }; // Light Red

    return { bg: '#fef3c7', text: '#92400e' }; // Light Yellow

  };



  return (

    <DashboardContainer theme={theme}>

      

      {/* 1. Summary Cards */}

      <StatsGrid theme={theme}>

        <StatCard 

          theme={theme} 

          $color={theme.colors.success || '#10b981'}

          $active={filter === 'ADDED'}

          onClick={() => setFilter(filter === 'ADDED' ? 'ALL' : 'ADDED')}

        >

          <h3>{summary.added}</h3>

          <p>Added</p>

        </StatCard>



        <StatCard 

          theme={theme} 

          $color={theme.colors.danger || '#ef4444'}

          $active={filter === 'REMOVED'}

          onClick={() => setFilter(filter === 'REMOVED' ? 'ALL' : 'REMOVED')}

        >

          <h3>{summary.removed}</h3>

          <p>Removed</p>

        </StatCard>



        <StatCard 

          theme={theme} 

          $color="#f59e0b"

          $active={filter === 'MODIFIED'}

          onClick={() => setFilter(filter === 'MODIFIED' ? 'ALL' : 'MODIFIED')}

        >

          <h3>{summary.modified}</h3>

          <p>Modified</p>

        </StatCard>

      </StatsGrid>



      {/* 2. Action Header */}

      <ActionRow theme={theme}>

        <FilterTitle theme={theme}>

          {filter === 'ALL' ? 'All Changes' : `${filter.charAt(0) + filter.slice(1).toLowerCase()} Items`}

          <span style={{ fontSize: '0.8em', color: theme.colors.textDisabled }}>

            ({filteredList.length})

          </span>

        </FilterTitle>



        {excel_url && (

          <DownloadLink href={excel_url} theme={theme} download>

            <Download size={18} />

            Download Report

          </DownloadLink>

        )}

      </ActionRow>



      {/* 3. The List */}

      <ListContainer theme={theme}>

        {filteredList.length > 0 ? (

          filteredList.map((item, idx) => {

            const colors = getBadgeColor(item.type);

            return (

              <ListItem key={idx} theme={theme}>

                {getIcon(item.type)}

                <Badge $bg={colors.bg} $text={colors.text}>{item.type}</Badge>

                <span style={{ wordBreak: 'break-all' }}>{item.path || item.Path}</span>

              </ListItem>

            );

          })

        ) : (

          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>

            No items found for this category.

          </div>

        )}

      </ListContainer>



    </DashboardContainer>

  );

}



export default ResultsDashboard;



