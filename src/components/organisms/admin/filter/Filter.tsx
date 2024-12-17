/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { SetStateAction } from 'react';
import { useState, useEffect } from 'react';

import dayjs from 'dayjs';

import { dateRangeButtons } from './Filter.utils';

import type { ICategoryOption, IFilterProps } from './Filter.types';

import { IconLine24Delete } from '@/components/atoms/icons/icon-line';
import { Select, DatePicker } from '@/components/atoms/inputs';
import { MultiSelect } from '@/components/atoms/inputs/MultiSelect';
import 'react-datepicker/dist/react-datepicker.css';

export default function Filter({ date, search, select, radio, category, checkbox, subCheckbox, range }: IFilterProps) {
  const dateText = date?.text || '조회기간';
  const selectText = select?.text || '검색어';
  const selectOptions = select?.options;
  const radioText = radio?.text || '옵션';
  const radioOptions = radio?.options || [];
  const categoryText = category?.text || '카테고리';
  const checkboxText = checkbox?.text || '회원상태';
  const checkboxOptions = checkbox?.options || [];
  const subCheckboxText = subCheckbox?.text || '상세상태';
  const subCheckboxOptions = subCheckbox?.options || [];
  const rangeText = range?.text || '범위';
  const rangeMin = range?.min || 0;
  const rangeMax = range?.max || 0;
  const rangePlaceholderStart = range?.placeholder?.start || '최소값';
  const rangePlaceholderEnd = range?.placeholder?.end || '최대값';

  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchType, setSearchType] = useState(
    select?.visible === false ? search?.defaultSearchType || '' : select?.options?.[0]?.value || '',
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [secondaryCategories, setSecondaryCategories] = useState<string[]>([]);
  const [secondaryOptions, setSecondaryOptions] = useState<ICategoryOption[]>([]);
  const [selectedSubStatus, setSelectedSubStatus] = useState<string[]>([]);
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');

  useEffect(() => {
    const urlPrimaryCategory = searchParams.get('primaryCategory') || '';
    setPrimaryCategory(urlPrimaryCategory);

    if (urlPrimaryCategory) {
      const urlSecondaryCategories = searchParams.get('secondaryCategory')?.split(',').filter(Boolean);
      if (urlSecondaryCategories && urlSecondaryCategories.length > 0) {
      } else {
        const firstSecondaryCategory = category?.options?.find((option) => option.value === urlPrimaryCategory)
          ?.children?.[0]?.value;
        const defaultSecondaryCategories = firstSecondaryCategory ? [firstSecondaryCategory] : [];
        setSecondaryCategories(defaultSecondaryCategories);
      }
    } else {
      setSecondaryCategories([]);
    }

    const urlStartDate = searchParams.get('startDate');
    setStartDate(urlStartDate ? new Date(urlStartDate) : null);

    const urlEndDate = searchParams.get('endDate');
    setEndDate(urlEndDate ? new Date(urlEndDate) : null);

    setSearchType(
      searchParams.get('searchType') ||
        (select?.visible === false ? search?.defaultSearchType || '' : select?.options?.[0]?.value || ''),
    );
    setSearchKeyword(searchParams.get('search') || '');

    const urlStatus = searchParams.get('status')?.split(',') || [];
    const hasAllOption = checkbox?.options?.some((option) => option.value === '0');
    let statusToSet: SetStateAction<string[]> = [];

    if (urlStatus.length > 0) {
      const nonZeroOptions =
        checkbox?.options?.filter((option) => option.value !== '0').map((option) => option.value) || [];
      const isAllSelected = nonZeroOptions.every((value) => urlStatus.includes(value));

      if (isAllSelected && hasAllOption) {
        statusToSet = checkbox?.options?.map((option) => option.value) || [];
      } else {
        statusToSet = urlStatus;
      }
    } else if (hasAllOption) {
      statusToSet = checkbox?.options?.map((option) => option.value) || [];
    }
    setSelectedStatus(statusToSet);

    const urlRadio = searchParams.get('radio');
    const hasAllRadioOption = radio?.options?.some((option) => option.value === '0');
    if (urlRadio) {
      setSelectedRadio(urlRadio);
    } else if (hasAllRadioOption) {
      setSelectedRadio('0');
    } else {
      setSelectedRadio(radio?.options?.[0]?.value || '');
    }

    const urlSubStatus = searchParams.get('subStatus')?.split(',') || [];
    const hasSubAllOption = subCheckbox?.options?.some((option) => option.value === '0');
    let subStatusValue: SetStateAction<string[]> = [];

    if (urlSubStatus.length > 0) {
      const nonZeroSubOptions =
        subCheckbox?.options?.filter((option) => option.value !== '0').map((option) => option.value) || [];
      const isAllSubSelected = nonZeroSubOptions.every((value) => urlSubStatus.includes(value));

      if (isAllSubSelected && hasSubAllOption) {
        subStatusValue = subCheckbox?.options?.map((option) => option.value) || [];
      } else {
        subStatusValue = urlSubStatus;
      }
    } else if (hasSubAllOption) {
      subStatusValue = subCheckbox?.options?.map((option) => option.value) || [];
    }
    setSelectedSubStatus(subStatusValue);
  }, [
    searchParams,
    category?.options,
    select?.options,
    select?.visible,
    search?.defaultSearchType,
    checkbox?.options,
    subCheckbox?.options,
    radio?.options,
  ]);

  useEffect(() => {
    if (!category?.options) return;

    const selectedPrimaryOption = category.options.find((option) => option.value === primaryCategory);

    if (selectedPrimaryOption?.children) {
      setSecondaryOptions(selectedPrimaryOption.children);
    } else {
      setSecondaryOptions([]);
    }
  }, [category?.options, primaryCategory]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (date?.visible !== false) {
      if (startDate) {
        params.set('startDate', dayjs(startDate).format('YYYY-MM-DD'));
      } else {
        params.delete('startDate');
      }

      if (endDate) {
        params.set('endDate', dayjs(endDate).format('YYYY-MM-DD'));
      } else {
        params.delete('endDate');
      }
    }

    if (select?.visible !== false) {
      if (searchType) params.set('searchType', searchType);
      else params.delete('searchType');
    }

    if (search?.visible !== false) {
      if (searchKeyword) params.set('search', searchKeyword);
      else params.delete('search');
    }

    if (checkbox?.visible !== false) {
      const filteredStatus = selectedStatus.filter((status) => status !== '0');
      if (filteredStatus.length > 0) {
        params.set('status', filteredStatus.join(','));
      } else {
        params.delete('status');
      }
    }

    if (radio?.visible !== false) {
      if (selectedRadio) params.set('radio', selectedRadio);
      else params.delete('radio');
    }

    if (category?.visible !== false) {
      if (primaryCategory) {
        params.set('primaryCategory', primaryCategory);
        if (secondaryCategories && secondaryCategories.length > 0) {
          params.set('secondaryCategory', secondaryCategories.join(','));
        } else {
          params.delete('secondaryCategory');
        }
      } else {
        params.delete('primaryCategory');
        params.delete('secondaryCategory');
      }
    }

    if (subCheckbox?.visible !== false) {
      const filteredSubStatus = selectedSubStatus.filter((status) => status !== '0');
      if (filteredSubStatus.length > 0) {
        params.set('subStatus', filteredSubStatus.join(','));
      } else {
        params.delete('subStatus');
      }
    }

    if (range?.visible !== false) {
      if (rangeStart) params.set('rangeStart', rangeStart);
      else params.delete('rangeStart');

      if (rangeEnd) params.set('rangeEnd', rangeEnd);
      else params.delete('rangeEnd');
    }

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const handleDateButton = (value: string) => {
    const today = new Date();
    let newStartDate = '';
    let newEndDate = today.toISOString().split('T')[0];

    switch (value) {
      case 'today':
        newStartDate = today.toISOString().split('T')[0];
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        newStartDate = yesterday.toISOString().split('T')[0];
        newEndDate = yesterday.toISOString().split('T')[0];
        break;
      case 'thisWeek':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
          .toISOString()
          .split('T')[0];
        break;
      case 'lastWeek':
        const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 1);
        newStartDate = lastWeekStart.toISOString().split('T')[0];
        newEndDate = lastWeekEnd.toISOString().split('T')[0];
        break;
      case 'thisMonth':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        break;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        newStartDate = lastMonth.toISOString().split('T')[0];
        newEndDate = lastMonthEnd.toISOString().split('T')[0];
        break;
      case '1month':
        const oneMonthDate = new Date(today);
        oneMonthDate.setMonth(today.getMonth() - 1);
        newStartDate = oneMonthDate.toISOString().split('T')[0];
        break;
      case '3month':
        const threeMonthDate = new Date(today);
        threeMonthDate.setMonth(today.getMonth() - 3);
        newStartDate = threeMonthDate.toISOString().split('T')[0];
        break;
      case '6month':
        const sixMonthDate = new Date(today);
        sixMonthDate.setMonth(today.getMonth() - 6);
        newStartDate = sixMonthDate.toISOString().split('T')[0];
        break;
    }

    setStartDate(new Date(newStartDate));
    setEndDate(new Date(newEndDate));
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchType(select?.visible === false ? search?.defaultSearchType || '' : select?.options?.[0]?.value || '');
    setSearchKeyword('');

    // 체크박스 기본값 설정
    const defaultStatus = checkbox?.options?.some((option) => option.value === '0')
      ? checkbox.options.map((option) => option.value)
      : [];
    setSelectedStatus(defaultStatus);

    // 라디오 기본값 설정
    const defaultRadio = radio?.options?.some((option) => option.value === '0')
      ? '0'
      : radio?.options?.[0]?.value || '';
    setSelectedRadio(defaultRadio);

    setPrimaryCategory('');
    setSecondaryCategories([]);

    // 서브 체크박스 기본값 설정
    const defaultSubStatus = subCheckbox?.options?.some((option) => option.value === '0')
      ? subCheckbox.options.map((option) => option.value)
      : [];
    setSelectedSubStatus(defaultSubStatus);

    const params = new URLSearchParams(searchParams);
    params.delete('startDate');
    params.delete('endDate');
    params.delete('searchType');
    params.delete('search');
    params.delete('status');
    params.delete('radio');
    params.delete('primaryCategory');
    params.delete('secondaryCategory');
    params.delete('subStatus');

    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus((prev) => {
      if (value === '0') {
        if (prev.includes('0')) {
          return [];
        }
        return checkbox?.options?.map((option) => option.value) || [];
      }

      const newStatus = prev.filter((item) => item !== '0');

      if (prev.includes(value)) {
        return newStatus.filter((status) => status !== value);
      }
      const updatedStatus = [...newStatus, value];
      if (updatedStatus.length === (checkbox?.options?.length || 0) - 1) {
        return [...updatedStatus, '0'];
      }
      return updatedStatus;
    });
  };

  const handleSubStatusChange = (value: string) => {
    setSelectedSubStatus((prev) => {
      if (value === '0') {
        if (prev.includes('0')) {
          return [];
        }
        return subCheckbox?.options?.map((option) => option.value) || [];
      }

      const newStatus = prev.filter((item) => item !== '0');

      if (prev.includes(value)) {
        return newStatus.filter((status) => status !== value);
      }
      const updatedStatus = [...newStatus, value];
      if (updatedStatus.length === (subCheckbox?.options?.length || 0) - 1) {
        return [...updatedStatus, '0'];
      }
      return updatedStatus;
    });
  };

  return (
    <div className={'p-5 border border-gray-80 rounded-2xl'}>
      <div className={'flex flex-col gap-8'}>
        <div className={'text-gray-0 font-pre-16-m-130'}>검색조건</div>

        <div className={'flex flex-col gap-3.5'}>
          {date?.visible !== false && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{dateText}</span>
              </div>

              <div className={'flex gap-2'}>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <span className={'text-gray-10'}>~</span>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />

                <div className={'flex gap-2'}>
                  {dateRangeButtons.map((button) => {
                    const getSelectedDates = (value: string) => {
                      const currentDate = new Date();
                      let startDateStr = '';
                      let endDateStr = currentDate.toISOString().split('T')[0];

                      switch (value) {
                        case 'today':
                          startDateStr = currentDate.toISOString().split('T')[0];
                          endDateStr = startDateStr;
                          break;
                        case 'yesterday':
                          const yesterday = new Date();
                          yesterday.setDate(currentDate.getDate() - 1);
                          startDateStr = yesterday.toISOString().split('T')[0];
                          endDateStr = startDateStr;
                          break;
                        case 'thisWeek':
                          startDateStr = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate() - currentDate.getDay(),
                          )
                            .toISOString()
                            .split('T')[0];
                          break;
                        case 'lastWeek':
                          const lastWeekStart = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate() - currentDate.getDay() - 7,
                          );
                          const lastWeekEnd = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate() - currentDate.getDay() - 1,
                          );
                          startDateStr = lastWeekStart.toISOString().split('T')[0];
                          endDateStr = lastWeekEnd.toISOString().split('T')[0];
                          break;
                        case 'thisMonth':
                          startDateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
                            .toISOString()
                            .split('T')[0];
                          break;
                        case 'lastMonth':
                          const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                          const lastMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                          startDateStr = lastMonth.toISOString().split('T')[0];
                          endDateStr = lastMonthEnd.toISOString().split('T')[0];
                          break;
                        case '1month':
                          const oneMonth = new Date(currentDate);
                          oneMonth.setMonth(currentDate.getMonth() - 1);
                          startDateStr = oneMonth.toISOString().split('T')[0];
                          break;
                        case '3month':
                          const threeMonths = new Date(currentDate);
                          threeMonths.setMonth(currentDate.getMonth() - 3);
                          startDateStr = threeMonths.toISOString().split('T')[0];
                          break;
                        case '6month':
                          const sixMonths = new Date(currentDate);
                          sixMonths.setMonth(currentDate.getMonth() - 6);
                          startDateStr = sixMonths.toISOString().split('T')[0];
                          break;
                      }
                      return { startDateStr, endDateStr };
                    };

                    const { startDateStr, endDateStr } = getSelectedDates(button.value);
                    const isSelected =
                      startDate?.toISOString().split('T')[0] === startDateStr &&
                      endDate?.toISOString().split('T')[0] === endDateStr;

                    return (
                      <button
                        key={button.value}
                        onClick={() => handleDateButton(button.value)}
                        className={`flex justify-center items-center text-gray-10 font-pre-13-m-130 h-8 border border-gray-70 rounded-lg px-3
                          ${isSelected ? 'border-sub-blue-s-d-blue-10 bg-sub-blue-s-blue-10 text-sub-blue-s-d-blue-10' : ''}`}
                      >
                        {button.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {search?.visible !== false && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{selectText}</span>
              </div>

              <div className={'flex gap-2'}>
                {select?.visible !== false && (
                  <Select
                    paramsName={'partner'}
                    value={searchType}
                    onChange={(event) => setSearchType(event.target.value)}
                    options={selectOptions}
                  />
                )}

                <input
                  type={'text'}
                  value={searchKeyword}
                  onChange={(event) => setSearchKeyword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className={
                    'w-[250px] text-gray-10 placeholder:text-gray-50 font-pre-13-r-130 h-8 border border-gray-70 rounded-lg ps-3.5 pe-2.5 py-[7px]'
                  }
                  placeholder={'입력'}
                />
              </div>
            </div>
          )}

          {checkbox?.visible !== false && checkbox != null && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{checkboxText}</span>
              </div>

              <div className={'flex gap-4'}>
                {checkboxOptions.map((option) => (
                  <label key={option.value} className={'flex items-center gap-2'}>
                    <div className={'relative w-4 h-4'}>
                      <input
                        type={'checkbox'}
                        checked={selectedStatus.includes(option.value)}
                        onChange={() => {
                          handleStatusChange(option.value);
                        }}
                        className={'absolute w-4 h-4 opacity-0'}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border border-gray-70 ${
                          selectedStatus.includes(option.value) ? 'bg-primary-50' : 'bg-white'
                        }`}
                      >
                        {selectedStatus.includes(option.value) && (
                          <svg
                            xmlns={'http://www.w3.org/2000/svg'}
                            width={'18'}
                            height={'18'}
                            viewBox={'0 0 18 18'}
                            fill={'none'}
                            className={'absolute -top-[1px] -left-[1px]'}
                          >
                            <path
                              d={
                                'M8.99999 17.1C13.4735 17.1 17.1 13.4735 17.1 9.00002C17.1 4.52652 13.4735 0.900024 8.99999 0.900024C4.52649 0.900024 0.899994 4.52652 0.899994 9.00002C0.899994 13.4735 4.52649 17.1 8.99999 17.1Z'
                              }
                              fill={'#409EFF'}
                            />
                            <path
                              d={'M12.7125 6.97498L7.76248 11.7L5.28751 9.33748'}
                              stroke={'white'}
                              strokeWidth={'1.5'}
                              strokeLinecap={'round'}
                              strokeLinejoin={'round'}
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={'text-gray-10 font-pre-13-r-130'}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {radio?.visible !== false && radio != null && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{radioText}</span>
              </div>

              <div className={'flex gap-4'}>
                {radioOptions.map((option) => (
                  <label key={option.value} className={'flex items-center gap-2'}>
                    <div className={'relative w-4 h-4'}>
                      <input
                        type={'radio'}
                        name={'radioGroup'}
                        value={option.value}
                        checked={selectedRadio === option.value}
                        onChange={(event) => {
                          setSelectedRadio(event.target.value);
                        }}
                        className={'absolute w-4 h-4 opacity-0'}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border border-gray-70 ${
                          selectedRadio === option.value ? 'border-primary-50' : ''
                        }`}
                      >
                        {selectedRadio === option.value && (
                          <div
                            className={
                              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-primary-50'
                            }
                          />
                        )}
                      </div>
                    </div>
                    <span className={'text-gray-10 font-pre-13-r-130'}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {category?.visible !== false && category?.options && category.options.length > 0 && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{categoryText}</span>
              </div>

              <div className={'flex gap-2'}>
                <MultiSelect
                  options={[{ value: '', label: '전체' }, ...(category?.options || [])]}
                  selectedValues={[primaryCategory]}
                  onChange={(values) => {
                    const newValue = values[values.length - 1] || '';
                    setPrimaryCategory(newValue);

                    if (!newValue) {
                      setSecondaryCategories([]);
                      return;
                    }

                    const selectedPrimaryOption = category?.options?.find((option) => option.value === newValue);
                    const firstSecondaryValue = selectedPrimaryOption?.children?.[0]?.value;

                    if (firstSecondaryValue) {
                      setSecondaryCategories([firstSecondaryValue]);
                    } else {
                      setSecondaryCategories([]);
                    }
                  }}
                  className={'min-w-[200px]'}
                  displayStyle={'inline'}
                  singleSelect
                />

                {secondaryOptions && secondaryOptions.length > 0 && (
                  <MultiSelect
                    options={[{ value: '', label: '전체' }, ...secondaryOptions]}
                    selectedValues={
                      secondaryOptions.every((opt) => secondaryCategories.includes(opt.value))
                        ? ['', ...secondaryCategories]
                        : secondaryCategories
                    }
                    onChange={(values) => {
                      const lastValue = values[values.length - 1];
                      const nonEmptyValues = values.filter((v) => v !== '');

                      if (lastValue === '') {
                        if (secondaryCategories.includes('')) {
                          setSecondaryCategories([]);
                        } else {
                          const allSecondaryValues = secondaryOptions.map((opt) => opt.value);
                          setSecondaryCategories(allSecondaryValues);
                        }
                      } else {
                        setSecondaryCategories(nonEmptyValues);
                      }
                    }}
                    className={'min-w-[200px]'}
                    displayStyle={'inline'}
                  />
                )}
              </div>
            </div>
          )}

          {range && range.visible !== false && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{rangeText}</span>
              </div>

              <div className={'flex gap-2 items-center'}>
                <input
                  type={'number'}
                  min={rangeMin}
                  max={rangeMax}
                  value={rangeStart}
                  onChange={(event) => setRangeStart(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSearch();
                  }}
                  className={
                    'w-[120px] text-gray-10 font-pre-13-r-130 h-8 px-3 py-2 border border-gray-70 rounded-lg placeholder:text-gray-50'
                  }
                  placeholder={rangePlaceholderStart}
                />
                <span className={'text-gray-10'}>~</span>
                <input
                  type={'number'}
                  min={rangeMin}
                  max={rangeMax}
                  value={rangeEnd}
                  onChange={(event) => setRangeEnd(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSearch();
                  }}
                  className={
                    'w-[120px] text-gray-10 font-pre-13-r-130 h-8 px-3 py-2 border border-gray-70 rounded-lg placeholder:text-gray-50'
                  }
                  placeholder={rangePlaceholderEnd}
                />
              </div>
            </div>
          )}

          {subCheckbox?.visible !== false && subCheckbox != null && (
            <div className={'flex'}>
              <div className={'w-[110px] py-1'}>
                <span className={'text-gray-10 font-pre-13-m-130'}>{subCheckboxText}</span>
              </div>

              <div className={'flex gap-4'}>
                {subCheckboxOptions.map((option) => (
                  <label key={option.value} className={'flex items-center gap-2'}>
                    <div className={'relative w-4 h-4'}>
                      <input
                        type={'checkbox'}
                        checked={selectedSubStatus.includes(option.value)}
                        onChange={() => {
                          handleSubStatusChange(option.value);
                        }}
                        className={'absolute w-4 h-4 opacity-0'}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border border-gray-70 ${
                          selectedSubStatus.includes(option.value) ? 'bg-primary-50' : 'bg-white'
                        }`}
                      >
                        {selectedSubStatus.includes(option.value) && (
                          <svg
                            xmlns={'http://www.w3.org/2000/svg'}
                            width={'18'}
                            height={'18'}
                            viewBox={'0 0 18 18'}
                            fill={'none'}
                            className={'absolute -top-[1px] -left-[1px]'}
                          >
                            <path
                              d={
                                'M8.99999 17.1C13.4735 17.1 17.1 13.4735 17.1 9.00002C17.1 4.52652 13.4735 0.900024 8.99999 0.900024C4.52649 0.900024 0.899994 4.52652 0.899994 9.00002C0.899994 13.4735 4.52649 17.1 8.99999 17.1Z'
                              }
                              fill={'#409EFF'}
                            />
                            <path
                              d={'M12.7125 6.97498L7.76248 11.7L5.28751 9.33748'}
                              stroke={'white'}
                              strokeWidth={'1.5'}
                              strokeLinecap={'round'}
                              strokeLinejoin={'round'}
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={'text-gray-10 font-pre-13-r-130'}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={'flex justify-start gap-2'}>
          <button
            onClick={handleReset}
            className={'flex h-8 justify-center items-center gap-1.5 border border-gray-70 rounded-lg ps-3 pe-4'}
          >
            <span className={'text-red-60'}>
              <IconLine24Delete />
            </span>
            <span className={'text-gray-10 font-pre-13-m-130'}>조건 삭제</span>
          </button>

          <button
            onClick={handleSearch}
            className={'flex w-[100px] h-8 min-w-[52px] px-3 justify-center items-center rounded-lg bg-black'}
          >
            <span className={'text-gray-100 font-pre-14-m-130'}>조회</span>
          </button>
        </div>
      </div>
    </div>
  );
}
