export const copyObj = (originObj) => {
  const originPrototype = Object.getPrototypeOf(originObj);
  let newObj = Object.create(originPrototype);
   
  const originObjOwnProperties = Object.getOwnPropertyNames(originObj);
  originObjOwnProperties.forEach((property) => {
    const prototypeDesc = Object.getOwnPropertyDescriptor(originObj, property);
     Object.defineProperty(newObj, property, prototypeDesc);
  });
  
  return newObj;
}