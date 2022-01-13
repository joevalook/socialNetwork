const nameStatArray = function(network, stat) {
  let result = []
  for (let element in network) {
    let a = []
    a.push(network[element]["name"]);
    a.push(network[element][stat]);
    result.push(a)
  }
return result;
};
//created a nested array that has the name and the desired stat in a single 2 element array

const biggestFollower = function(data) {
  let nameFollowers = nameStatArray(data, "follows")
  let bigName = "" 
  let bigNum = 0
  for (let i = 0; i < nameFollowers.length; i++) {
    if (nameFollowers[i][1].length > bigNum) {
      bigName = nameFollowers[i][0];
      bigNum = nameFollowers[i][1].length;
    }
    else if (nameFollowers[i][1].length === bigNum) {
      if (Array.isArray(bigName)) {
        bigName.push(nameFollowers[i][0])
      }
      else {
        let c = bigName
        bigName = []
        bigName.push(c, nameFollowers[i][0])
      }
    }
  }
  return bigName
}

//this function returns a string with the name of the person that follows the most people. If it is a tie, this function returns an array of names of the people that follow the most people

const objectFollowers = function(dataof) {
  const results = {};
  let nameFollowers = nameStatArray(dataof, "follows")
  for (let i = 0; i < nameFollowers.length; i++) {
    for (let items of nameFollowers[i][1])
    if (results[items]) {
      results[items] += 1;
    } else {
      results[items] = 1;
    }
    
  }
  return results;
}

//this function returns an object with key of people (not names) and the number of followers

const mostPopular = function(datamp) {
  let objfol = objectFollowers(datamp)
  let mostFollowers = 0
  let mostPop = ""
  for (let items in objfol) {
    if (objfol[items] > mostFollowers) {
      mostFollowers = objfol[items];
      mostPop = datamp[items].name;
    }
    else if (objfol[items] === mostFollowers) {
      if (Array.isArray(mostPop)) {
        mostPop.push(datamp[items].name)
      }
      else {
        let c = mostPop
        mostPop = []
        mostPop.push(c, datamp[items].name)
      }
    }
  } return mostPop;
}


const data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

console.log(biggestFollower(data)); //Debbie
console.log(objectFollowers(data)); // { f02: 2, f03: 2, f04: 3, f05: 3, f06: 3, f01: 2 }
console.log(mostPopular(data)); //[ 'Debbie', 'Elizabeth', 'Finn' ]

// data.f01.name