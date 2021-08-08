using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;
using Mapster;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context) => _context = context;
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                request.Activity.Adapt(activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}