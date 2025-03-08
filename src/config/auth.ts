export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'sua_chave_secreta_padrao', // Use a mesma chave do backend
  tokenPrefix: 'Bearer'
}; 