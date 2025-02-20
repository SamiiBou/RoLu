import work2 from './work2.png';

export const SuccessPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Image en arrière-plan */}
      <img 
        src={work2} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Contenu au-dessus */}
      <div className="relative z-10 flex flex-col items-center justify-center p-24">
        {/* <h1>Verification Successful!</h1>
        <p>Your verification was completed successfully.</p> */}
      </div>
    </div>
  );
};
