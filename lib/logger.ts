export const logger = (text: string, object: any) => {
  console.log(`${text}: `, JSON.stringify(object, null, 2));
};
