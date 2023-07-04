/* Problem Statement:- Given an array of integers and a target value, you must determine which two integers' sum
equals the target and return a 2D array. Then merge the array into a single array with sorting (
ascending ) order, in the next step double the target value and find again the combination of
digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D
array.
Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];
Target Value = 4,
Output: First Combination For “4” : [ [1,3],[2,2],[-4,8],[-6,2] ];
Merge Into a single Array : [-6,-4,1,2,2,2,3,8];
Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],....,[n,n,n,n] ] */

// Part-1:-  First Combination For “4”
// Approach -1 :-  Two Pointer Method

function twoPointer(arr, target) {
  // Sort the input array
  arr.sort((a, b) => a - b);

  // Initialize two pointers, one at the beginning and one at the end of the array
  let left = 0;
  let right = arr.length - 1;

  let combinations = [];

  while (left < right) {
    let currentSum = arr[left] + arr[right];

    if (currentSum === target) {
      // Add the pair of integers to the combinations array
      combinations.push([arr[left], arr[right]]);

      // Move the pointers to find other combinations
      left++;
      right--;
    } else if (currentSum < target) {
      // If the current sum is smaller than the target, move the left pointer to the right
      left++;
    } else {
      // If the current sum is larger than the target, move the right pointer to the left
      right--;
    }
  }

  return combinations;
}

let arr = [1, 3, 2, 2, -4, -6, -2, 8];
let target = 4;
const result = twoPointer(arr, target);
console.log(result);

// Part-1 , Method2

var twoSum = function (nums, target) {
  nums.sort((a, b) => a - b);

  let left = 0;
  let right = 1;
  let ans = [];

  while (left < nums.length) {
    let sum = nums[left] + nums[right];
    if (sum == target) {
      //   console.log([left, right]);
      ans.push([nums[left], nums[right]]);
    } else if (right == nums.length - 1) {
      left++;
      right = left + 1;
    } else {
      right++;
    }
  }
  return ans;
};

let res = twoSum(arr, target);
console.log(res);

// Time Complexity :- O(nlogn):-  here n is number of elements in the array. Because of sorting algorithm it takes O(nlogn) after sorting two pointer takes O(n) time.
// Space Complexity:-  O(1) :- Because it takes constant amount of space and this doesnot increase with respect to size of array.

//----------------------------------------------------------------
//Approach:3:-  Key value pairs
function keyValue(arr, target) {
  let map = {}; // Map to store elements and their indices
  let result = []; // Array to store pairs

  for (let i = 0; i < arr.length; i++) {
    let complement = target - arr[i];

    if (map.hasOwnProperty(complement)) {
      // Found a pair whose sum is equal to the target
      let complementIndex = map[complement];
      result.push([arr[complementIndex], arr[i]]);
    }

    // Add current element and its index to the map
    map[arr[i]] = i;
  }

  return result;
}

const another_result = keyValue(arr, target);
console.log(another_result);

// Time complexity:-  O(n) :- Because this approach iterates over array only once
// Space complexity:- O(n) :- Because the space increases linearly with respect to array

// Note:-  This approach is best approach to do because it consumes less time.

// ---------------------------------------------------------------------

// Note- Above part-1 logic will failed with testCase like  arr = [2, 2, 2, 2, 2]; and target =4

// To Get the Correct Answer we can use nested forloop

function twoSum(arr, target) {
  let ans = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        ans.push([arr[i], arr[j]]);
      }
    }
  }
  return ans;
}
let arr1 = [2, 2, 2, 2, 2, , 2, 2];

let ans = twoSum(arr1, 4);
console.log(ans);

// Time complexity:-  O(n^2) :- Because this approach iterates over array only once

// Space Complexity:-  O(1) :- Because it takes constant amount of space and this doesnot increase with respect to size of array.
//----------------------------------------------------------------

// Part-2:-  Merge Into a single Array

function mergePairs(result) {
  // Creating a flattened array from the array of arrays
  const flattenedArray = result.reduce((acc, ele) => acc.concat(ele), []);

  //sorting the flattened array from ascending order
  const sortedArray = flattenedArray.sort((a, b) => a - b);
  return sortedArray;
}

let mergedArray = mergePairs(result);
// console.log(mergedArray);

// Time complexity:- O(nlogn):- Because of the sorting algorithm
// Space complexity:- O(n):-  Because we are returning a new array of n length;

//----------------------------------------------------------------
// Part-3:-  Second Combination For “8”
// Approach:- Backtracking
function findCombinations(arr, target) {
  const combinations = [];
  const currentCombination = [];

  const backtrack = (startIndex, currentSum) => {
    if (currentSum === target) {
      combinations.push(currentCombination.slice()); // Add a copy of the current combination
      return;
    }

    if (currentSum > target) {
      return; // Stop exploration if the current sum exceeds the target // edge case
    }

    for (let i = startIndex; i < arr.length; i++) {
      currentCombination.push(arr[i]);
      backtrack(i + 1, currentSum + arr[i]);
      currentCombination.pop();
    }
  };

  arr.sort((a, b) => a - b); // Sort the input array in ascending order
  backtrack(0, 0);
  return combinations;
}

const doubleTarget = target * 2;
const secondCombinations = findCombinations(arr, doubleTarget);
// console.log(secondCombinations);

// Time Complexity:- O(2^n):- Because it depends on the number of valid combinations that sum up to the double of the target value.
// Space Complexity:- O(2^n):- due to the need to store all valid combinations in the combinations array.
