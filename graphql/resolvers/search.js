const search = async (_, args, context) => (await context.openai.search(args.search_input)).data

module.exports = {
  queries: {
    search
  }
};
