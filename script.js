// 급식 조회 시스템 JavaScript

class MealService {
    constructor() {
        this.selectedSchool = null;
        this.currentMealType = 2; // 기본값: 점심
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDate();
    }

    setupEventListeners() {
        // 학교 검색
        document.getElementById('search-btn').addEventListener('click', () => {
            this.searchSchools();
        });

        document.getElementById('school-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchSchools();
            }
        });

        // 학교 변경 버튼
        document.getElementById('change-school-btn').addEventListener('click', () => {
            this.showSchoolSearch();
        });

        // 식사 종류 버튼
        document.querySelectorAll('.meal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectMealType(e.target);
            });
        });

        // 급식 조회 버튼
        document.getElementById('get-meal-btn').addEventListener('click', () => {
            this.getMealInfo();
        });
    }

    setDefaultDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}-${month}-${day}`;
        
        document.getElementById('meal-date').value = todayString;
    }

    async searchSchools() {
        const searchTerm = document.getElementById('school-search').value.trim();
        
        if (!searchTerm) {
            this.showError('학교명을 입력해주세요.');
            return;
        }

        this.showLoading(true);
        
        try {
            const url = `/.netlify/functions/searchSchools?SCHUL_NM=${encodeURIComponent(searchTerm)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.schoolInfo && data.schoolInfo[1] && data.schoolInfo[1].row) {
                this.displaySchoolResults(data.schoolInfo[1].row);
            } else {
                this.showError('검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('학교 검색 오류:', error);
            this.showError('학교 검색 중 오류가 발생했습니다.');
        } finally {
            this.showLoading(false);
        }
    }

    displaySchoolResults(schools) {
        const resultsContainer = document.getElementById('school-results');
        resultsContainer.innerHTML = '';
        
        if (schools.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        } else {
            schools.forEach(school => {
                const schoolItem = document.createElement('div');
                schoolItem.className = 'school-item';
                schoolItem.innerHTML = `
                    <div class="school-name">${school.SCHUL_NM}</div>
                    <div class="school-address">${school.ORG_RDNMA}</div>
                `;
                
                schoolItem.addEventListener('click', () => {
                    this.selectSchool(school);
                });
                
                resultsContainer.appendChild(schoolItem);
            });
        }
        
        resultsContainer.style.display = 'block';
    }

    selectSchool(school) {
        this.selectedSchool = school;
        
        // 선택된 학교 정보 표시
        document.getElementById('selected-school-name').textContent = school.SCHUL_NM;
        document.getElementById('selected-school').style.display = 'block';
        document.getElementById('school-results').style.display = 'none';
        document.getElementById('date-section').style.display = 'block';
        
        // 급식 표시 섹션 숨기기
        document.getElementById('meal-display').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';
    }

    showSchoolSearch() {
        document.getElementById('selected-school').style.display = 'none';
        document.getElementById('date-section').style.display = 'none';
        document.getElementById('meal-display').style.display = 'none';
        document.getElementById('school-search').value = '';
        document.getElementById('school-results').style.display = 'none';
        this.selectedSchool = null;
    }

    selectMealType(clickedBtn) {
        // 모든 버튼에서 active 클래스 제거
        document.querySelectorAll('.meal-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 클릭된 버튼에 active 클래스 추가
        clickedBtn.classList.add('active');
        
        // 현재 선택된 식사 종류 업데이트
        this.currentMealType = parseInt(clickedBtn.dataset.meal);
    }

    async getMealInfo() {
        if (!this.selectedSchool) {
            this.showError('학교를 선택해주세요.');
            return;
        }

        const selectedDate = document.getElementById('meal-date').value;
        if (!selectedDate) {
            this.showError('날짜를 선택해주세요.');
            return;
        }

        this.showLoading(true);
        this.hideError();
        
        try {
            const formattedDate = selectedDate.replace(/-/g, '');
            const params = new URLSearchParams({
                ATPT_OFCDC_SC_CODE: this.selectedSchool.ATPT_OFCDC_SC_CODE,
                SD_SCHUL_CODE: this.selectedSchool.SD_SCHUL_CODE,
                MLSV_YMD: formattedDate,
                MMEAL_SC_CODE: this.currentMealType
            });

            const url = `/.netlify/functions/getMealData?${params.toString()}`;
            
            const response = await fetch(url);
            const data = await response.json();

            this.displayMealInfo(data, selectedDate);
        } catch (error) {
            console.error('급식 정보 조회 오류:', error);
            this.showError('급식 정보를 불러오는 중 오류가 발생했습니다.');
        } finally {
            this.showLoading(false);
        }
    }

    displayMealInfo(data, selectedDate) {
        const mealDisplay = document.getElementById('meal-display');
        const mealContent = document.getElementById('meal-content');
        const mealTitle = document.getElementById('meal-title');
        const mealDateInfo = document.getElementById('meal-date-info');
        const nutritionSection = document.getElementById('meal-nutrition');

        // 급식 표시 섹션 표시
        mealDisplay.style.display = 'block';

        // 식사 종류에 따른 제목 설정
        const mealNames = { 1: '아침', 2: '점심', 3: '저녁' };
        mealTitle.textContent = `${mealNames[this.currentMealType]} 급식`;

        // 날짜 정보 설정
        const dateObj = new Date(selectedDate);
        const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
        mealDateInfo.textContent = formattedDate;

        if (data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row) {
            const mealData = data.mealServiceDietInfo[1].row[0];
            
            // 급식 메뉴 표시
            if (mealData.DDISH_NM) {
                const menuItems = mealData.DDISH_NM.split('<br/>').filter(item => item.trim());
                const menuHtml = menuItems.map(item => `• ${item.trim()}`).join('\n');
                mealContent.innerHTML = `<div class="meal-menu">${menuHtml}</div>`;
            } else {
                mealContent.innerHTML = '<div class="no-meal">급식 정보가 없습니다.</div>';
            }

            // 영양 정보 표시
            if (mealData.CAL_INFO || mealData.NTR_INFO) {
                this.displayNutritionInfo(mealData);
                nutritionSection.style.display = 'block';
            } else {
                nutritionSection.style.display = 'none';
            }

            // 칼로리 정보가 있으면 표시
            if (mealData.CAL_INFO) {
                const calInfo = document.createElement('div');
                calInfo.className = 'calorie-info';
                calInfo.innerHTML = `<strong>칼로리:</strong> ${mealData.CAL_INFO}`;
                mealContent.appendChild(calInfo);
            }

        } else {
            mealContent.innerHTML = '<div class="no-meal">해당 날짜의 급식 정보가 없습니다.</div>';
            nutritionSection.style.display = 'none';
        }
    }

    displayNutritionInfo(mealData) {
        const nutritionInfo = document.getElementById('nutrition-info');
        
        if (mealData.NTR_INFO) {
            const nutritionItems = mealData.NTR_INFO.split('<br/>');
            let nutritionHtml = '';
            
            nutritionItems.forEach(item => {
                if (item.trim()) {
                    const [label, value] = item.split(':').map(s => s.trim());
                    if (label && value) {
                        nutritionHtml += `
                            <div class="nutrition-item">
                                <div class="nutrition-label">${label}</div>
                                <div class="nutrition-value">${value}</div>
                            </div>
                        `;
                    }
                }
            });
            
            nutritionInfo.innerHTML = nutritionHtml;
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const getMealBtn = document.getElementById('get-meal-btn');
        
        if (show) {
            loading.style.display = 'block';
            getMealBtn.disabled = true;
            getMealBtn.textContent = '조회 중...';
        } else {
            loading.style.display = 'none';
            getMealBtn.disabled = false;
            getMealBtn.innerHTML = '<i class="fas fa-search"></i> 급식 조회';
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        
        // 5초 후 자동으로 숨기기
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        document.getElementById('error-message').style.display = 'none';
    }
}

// 페이지 로드 시 급식 서비스 초기화
document.addEventListener('DOMContentLoaded', () => {
    new MealService();
});

// 추가 유틸리티 함수들
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 학교 검색 자동완성 기능 (선택사항)
const debouncedSearch = debounce(function(searchTerm) {
    if (searchTerm.length >= 2) {
        // 여기에 자동완성 로직을 추가할 수 있습니다
    }
}, 300);

// 학교 검색 입력 필드에 자동완성 이벤트 추가
document.getElementById('school-search').addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
